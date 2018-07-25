export const changeTheme = {
   type:'CHANGE_THEME'
}

export function changePath(path=[""]){
	return {
		type:'CHANGE_PATH',
		path:path
	}
		
}
