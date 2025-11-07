import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Trip, Place } from '@/types'

interface TripStore {
  currentTrip: Trip | null
  savedTrips: Trip[]
  favorites: Place[]
  
  createTrip: (name: string) => void
  addPlaceToTrip: (place: Place) => void
  removePlaceFromTrip: (placeId: string) => void
  saveTrip: () => void
  loadTrip: (tripId: string) => void
  deleteTrip: (tripId: string) => void
  
  addToFavorites: (place: Place) => void
  removeFromFavorites: (placeId: string) => void
  isFavorite: (placeId: string) => boolean
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      currentTrip: null,
      savedTrips: [],
      favorites: [],

      createTrip: (name: string) => {
        const newTrip: Trip = {
          id: Date.now().toString(),
          name,
          places: [],
          startDate: '',
          endDate: '',
          isPublic: false,
        }
        set({ currentTrip: newTrip })
      },

      addPlaceToTrip: (place: Place) => {
        const { currentTrip } = get()
        if (currentTrip) {
          const updatedTrip = {
            ...currentTrip,
            places: [...currentTrip.places, place],
          }
          set({ currentTrip: updatedTrip })
        }
      },

      removePlaceFromTrip: (placeId: string) => {
        const { currentTrip } = get()
        if (currentTrip) {
          const updatedTrip = {
            ...currentTrip,
            places: currentTrip.places.filter(p => p.id !== placeId),
          }
          set({ currentTrip: updatedTrip })
        }
      },

      saveTrip: () => {
        const { currentTrip, savedTrips } = get()
        if (currentTrip) {
          const existingIndex = savedTrips.findIndex(t => t.id === currentTrip.id)
          if (existingIndex >= 0) {
            const updatedTrips = [...savedTrips]
            updatedTrips[existingIndex] = currentTrip
            set({ savedTrips: updatedTrips })
          } else {
            set({ savedTrips: [...savedTrips, currentTrip] })
          }
        }
      },

      loadTrip: (tripId: string) => {
        const { savedTrips } = get()
        const trip = savedTrips.find(t => t.id === tripId)
        if (trip) {
          set({ currentTrip: trip })
        }
      },

      deleteTrip: (tripId: string) => {
        const { savedTrips } = get()
        set({ savedTrips: savedTrips.filter(t => t.id !== tripId) })
      },

      addToFavorites: (place: Place) => {
        const { favorites } = get()
        if (!favorites.find(p => p.id === place.id)) {
          set({ favorites: [...favorites, place] })
        }
      },

      removeFromFavorites: (placeId: string) => {
        const { favorites } = get()
        set({ favorites: favorites.filter(p => p.id !== placeId) })
      },

      isFavorite: (placeId: string) => {
        const { favorites } = get()
        return favorites.some(p => p.id === placeId)
      },
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
)
