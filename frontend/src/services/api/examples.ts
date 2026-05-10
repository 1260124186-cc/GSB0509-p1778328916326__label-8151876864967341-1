import { http, type ApiEnvelope } from '../http'
import type { ExampleItem } from '../../data/examples'

export async function fetchExampleItems(): Promise<ExampleItem[]> {
  const res = await http.get<ApiEnvelope<ExampleItem[]>>('/examples')
  return res.data
}

export async function fetchExampleItemDetail(id: string): Promise<ExampleItem> {
  const res = await http.get<ApiEnvelope<ExampleItem>>(`/examples/${encodeURIComponent(id)}`)
  return res.data
}
