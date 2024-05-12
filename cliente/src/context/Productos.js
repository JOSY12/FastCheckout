/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import data from '../assets/data.js'
export const Productos = create(set => ({
  productos: data
}))
