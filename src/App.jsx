import { useState } from 'react'
import { useForm } from "react-hook-form";

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          <input
            type="text"
            placeholder='Ваше имя'
            {...register('name', { required: "Поля обязательно к заполнению" })}
          />
          {errors.name && <p style={{ color: 'red', fontsize: '14px' }}>{errors.name.message}</p>}
        </label>
        <label>
          <input
            type="text"
            placeholder='Ваш номер'
            {...register('number', { required: "Поля обязательно к заполнению" })}
          />
          {errors.number && <p style={{ color: 'red', fontsize: '14px' }}>{errors.number.message}</p>}
        </label>

        <button type='submit'>
          Отправить
        </button>
      </form>

    </>
  )
}

export default App
