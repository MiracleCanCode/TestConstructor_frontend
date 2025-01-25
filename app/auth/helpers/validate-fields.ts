export const validateField = (value: string, field: string, mode: string) => {
	if (mode === 'registration') {
		if (field === 'name' && value.length < 2) return 'Имя не может быть меньше 2 символов'
		if (field === 'email' && !/^\S+@\S+$/.test(value)) return 'Не валидная почта'
		if (field === 'login' && value.length < 5) return 'Логин не может быть меньше 5 символов'
		if (field === 'password' && value.length < 16) return 'Пароль не может быть меньше 16 символов'
	} else {
		if (field === 'login' && value.length < 1) return 'Логин не может быть пустой'
		if (field === 'password' && value.length < 1) return 'Пароль не может быть пустой'
	}
	return null
}
