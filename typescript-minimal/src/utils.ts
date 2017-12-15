import { Graphcool } from 'graphcool-binding'

export interface Context {
  db: Graphcool
  request: any
}