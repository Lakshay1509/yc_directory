import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,writeToken } from '../env'

export const write_client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: writeToken,
})


if(!write_client) {
  throw new Error('No write client found')
}
