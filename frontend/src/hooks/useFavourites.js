import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function useFavourites() {
  const [favourites, setFavourites] = useState([])
  const [user, setUser] = useState(null)

  const loadFavourites = async (userId) => {
    const { data } = await supabase.from('favourites').select('*').eq('user_id', userId)
    setFavourites(data || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
      if (data?.user) loadFavourites(data.user.id)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
      if (session?.user) loadFavourites(session.user.id)
      else setFavourites([])
    })
    return () => listener?.subscription?.unsubscribe()
  }, [])

  const toggleFavourite = async (hospital) => {
    if (!user) return false
    const exists = favourites.find(f => f.hospital_id === hospital.id)
    if (exists) {
      await supabase.from('favourites').delete().eq('id', exists.id)
      setFavourites(prev => prev.filter(f => f.hospital_id !== hospital.id))
    } else {
      const { data } = await supabase.from('favourites').insert({
        user_id: user.id,
        hospital_id: hospital.id,
        hospital_name: hospital.name,
        hospital_district: hospital.district,
        hospital_type: hospital.type,
      }).select().single()
      if (data) setFavourites(prev => [...prev, data])
    }
    return true
  }

  const isFavourite = (hospitalId) => favourites.some(f => f.hospital_id === hospitalId)

  return { user, favourites, toggleFavourite, isFavourite }
}
