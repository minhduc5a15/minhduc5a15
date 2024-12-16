'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          value={formState.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Send Message</Button>
    </motion.form>
  )
}

