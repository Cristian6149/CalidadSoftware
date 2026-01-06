function createStore( validations ){
	if(validations === undefined) validations = {}
	let state = {}
	let listeners = {}
	const getValue = value => {
		if(Array.isArray(value)) return [...value]
		if(typeof value == 'object') return {...value}
		return value 
	}
	let vueInstance = null
	window.store = ( useKey , value , query) =>{
		
		const runValidation = ( key , value ) => {
			if(!validations[key]) validations[key]= []
			if(!validations[key].length) return true 
			for(let validation of validations[key]){
				let validationResult = validation( state , value )
				if( validationResult !== true ) {
					console.log('fallo la validacion para data ' , {key, value})
					alert( validationResult )
					return false
				}
			}
			return true
		}

		const updateState = (key , value) => {
			if(runValidation( key , value )){
				state[key] = value
				if(listeners[ key ]){
					for(let listener of listeners[ key ]){
						if(listener.fn) listener.fn( state[key] )
						else listener.self()[key] = value
					}
				}
				return true
			}
			return false
		}

		const addListener = ( key , callback ) => {
			if(!listeners[key]) listeners[key] = []
			listeners[key].push( callback )
		}

		let actions = {
			push( key , data , value ){
				data.push( value )
				return updateState( key , data )
			},
			unshift( key , data , value ){
				data.unshift( value )
				return updateState( key , data )
			},
			filter( key , data , filter ){
				return data.filter( filter(item) )
			},
			get( key , data , value , attr ){
				let result = []
				for(let i=0; i<data.length; i++){
					if(query){
						if( query( data[i] ) ){
							result.push( data[i] )
							break
						}
					}else{
						if( data[i][attr] == attrValue ){
							result.push( data[i] )
						}
					}
				}	
				return result
			},
			set( key , data , value , attr , attrValue){
				for(let i=0; i<data.length; i++){
					if(query){
						if( query( data[i] ) ){
							let item = data[i]
							for(let attr in value){
								item[attr] = value[attr]
							}
							data.splice(i, 1, item)
							break
						}
					}else{
						if( data[i][attr] == attrValue ){
							let item = data[i]
							for(let attr in value){
								item[attr] = value[attr]
							}
							data.splice(i, 1, item)
							break
						}
					}
				}
				return updateState( key , data )
			},
			removeBy(key, data, value, attr, attrValue) {
				for (let i = 0; i < data.length; i++) {
					if (data[i][attr] == attrValue) {
						data.splice(i, 1)
						break
					}
				}
				return updateState(key, data)
			}
		}
		if(typeof useKey == 'object'){
			if(Array.isArray(useKey)){
				for( key of useKey){
					addListener( key , {
						fn:null
						, self: value
					} )
				}
				return 0
			}
			for( key in useKey){
				addListener( key , {
					fn:useKey[key]
					, self: value
				} )
			}
			return 0
		}
		if (typeof useKey == 'string') {
			if (useKey.split('@').length === 2) {
				let action = useKey.split('@')[1].split('/')[0]
				let key = useKey.split('@')[0]
				let attr = ''
				let attrValue = ''
				if (useKey.split('@')[1].split('/').length == 3) {
					let actionQuery = useKey.split('@')[1].split('/')
					action = actionQuery[0]
					attr = actionQuery[1]
					attrValue = actionQuery[2]
				}
				if (actions[action]) {
					return actions[action](key, getValue(state[key]), value, attr, attrValue)
				} else {
					console.log('no existe la accion ' + action)
				}
			}
		}
		
		
		if(typeof useKey == 'string'){
			let data 
			if(typeof value === 'function' || useKey.split('/').length == 2) {
				if(useKey.split('/').length == 2){
					let id = useKey.split('/')[1]
					useKey = useKey.split('/')[0]
					let lista = getValue(state[useKey])
					for(let key of Object.keys(lista)){
						if(lista[key].id == id) {
							for(let keyUpdate in value){
								lista[key][keyUpdate] = value[keyUpdate]
							}
							break
						}
					}
					data = lista
					console.log( lista)
				}else{
					data = value( () => getValue(state[useKey]) )
				}
				
				return updateState( useKey , data )
			}
		}
		if(value !== undefined){
			if(typeof value == 'function'){
				value = value( getValue(state[useKey]) )
			}
			return updateState(useKey, value)
		}
		if(typeof useKey === 'string') {
			return getValue(state[useKey])
		}
	}
}