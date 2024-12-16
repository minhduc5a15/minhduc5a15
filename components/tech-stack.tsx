'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function TechStack() {
  const technologies = {
    'Languages': ['Python', 'JavaScript', 'TypeScript', 'C++', 'Go'],
    'Frontend': ['React', 'Next.js', 'Vue.js', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
    'Tools': ['Git', 'Docker', 'Linux', 'VS Code'],
    'Design': ['Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects']
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Tech Stack</h3>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(technologies).map(([category, techs]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
              <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
                {techs.map(tech => (
                  <motion.div key={tech} variants={itemVariants}>
                    <Badge variant="secondary">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}

