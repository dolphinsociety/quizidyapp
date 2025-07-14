// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get('/quiz-questions', (req, res, ctx) => {
    return res(
      ctx.json({
        questions: [
          // Mock quiz questions
        ]
      })
    )
  })
]
