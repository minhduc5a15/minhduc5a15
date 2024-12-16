'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const timelineEvents = [
  {
    year: '2023',
    title: 'Senior Security Engineer',
    company: 'SecureTech Solutions',
    description: 'Led security audits and implemented advanced threat detection systems.'
  },
  {
    year: '2021',
    title: 'Full Stack Developer',
    company: 'InnovateSoft',
    description: 'Developed secure web applications and APIs using React and Node.js.'
  },
  {
    year: '2019',
    title: 'Junior Developer',
    company: 'CodeCraft Inc.',
    description: 'Started career focusing on front-end development and basic security practices.'
  }
]

export default function Timeline() {
  return (
    <div className="relative">
      {timelineEvents.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 flex justify-between items-center w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <span className="text-sm text-muted-foreground">{event.year}</span>
              </div>
              <p className="text-muted-foreground mb-2">{event.company}</p>
              <p className="text-sm">{event.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

