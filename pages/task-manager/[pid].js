import React from 'react';
import { useRouter } from 'next/router'

export default function TaskDetailsPage() {
  const router = useRouter()
  const { pid } = router.query
  
  return (
    <div>Hello {pid}</div>
  )
}
