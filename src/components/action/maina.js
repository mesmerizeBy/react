export const changeTheme = {
   type:'CHANGE_THEME'
}


export const Login =  {
	
	type:'Login'

}
export function addTag(t) {
	return {
		type:'ADD_TAG',
		tag:t
	}
}
export function removeTag(t) {
	return {
		type:'REMOVE_TAG',
		tag:t
	}
}
export function addType(t) {
	return {
		type:'ADD_TYPE',
		types:t
	}
}
export function removeType(t) {
	return {
		type:'REMOVE_TYPE',
		types:t
	}
}

