import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { Routine, EmotionType } from '../types/database'

interface UseRoutinesReturn {
  routines: Record<EmotionType, Routine | null>
  loading: boolean
  error: string | null
  saveRoutine: (emotion: EmotionType, name: string, steps: string[]) => Promise<void>
  deleteRoutine: (emotion: EmotionType) => Promise<void>
  refreshRoutines: () => Promise<void>
}

export function useRoutines(): UseRoutinesReturn {
  const { user } = useAuth()
  const [routines, setRoutines] = useState<Record<EmotionType, Routine | null>>({
    disappointment: null,
    frustration: null,
    anger: null,
    anxiety: null,
    calmness: null,
    excitement: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRoutines = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)

      if (fetchError) throw fetchError

      // Map routines by emotion
      const routineMap: Record<EmotionType, Routine | null> = {
        disappointment: null,
        frustration: null,
        anger: null,
        anxiety: null,
        calmness: null,
        excitement: null,
      }

      data?.forEach((routine) => {
        routineMap[routine.emotion as EmotionType] = routine as Routine
      })

      setRoutines(routineMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch routines')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchRoutines()
  }, [fetchRoutines])

  const saveRoutine = async (emotion: EmotionType, name: string, steps: string[]) => {
    if (!user) {
      setError('Must be logged in to save routines')
      return
    }

    try {
      setError(null)
      const existingRoutine = routines[emotion]

      if (existingRoutine) {
        // Update existing routine
        const { error: updateError } = await supabase
          .from('routines')
          .update({ name, steps, updated_at: new Date().toISOString() })
          .eq('id', existingRoutine.id)

        if (updateError) throw updateError
      } else {
        // Insert new routine
        const { error: insertError } = await supabase
          .from('routines')
          .insert({
            user_id: user.id,
            emotion,
            name,
            steps,
          })

        if (insertError) throw insertError
      }

      await fetchRoutines()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save routine')
      throw err
    }
  }

  const deleteRoutine = async (emotion: EmotionType) => {
    if (!user) {
      setError('Must be logged in to delete routines')
      return
    }

    const existingRoutine = routines[emotion]
    if (!existingRoutine) return

    try {
      setError(null)
      const { error: deleteError } = await supabase
        .from('routines')
        .delete()
        .eq('id', existingRoutine.id)

      if (deleteError) throw deleteError

      await fetchRoutines()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete routine')
      throw err
    }
  }

  return {
    routines,
    loading,
    error,
    saveRoutine,
    deleteRoutine,
    refreshRoutines: fetchRoutines,
  }
}
