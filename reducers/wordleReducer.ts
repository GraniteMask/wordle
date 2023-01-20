export const initialState = {
    attempts: -1,
}

export type ActionType = {
    type: String;
    payload: any;
}

export const reducer = (state: any, action: ActionType) : any =>{
    switch(action.type){
        case "ADD-WORD":
            return{
             ...state,
             words: action.payload
            }
        case "ATTEMPTS":
            return{
                ...state,
                attempts: action.payload
            }
    }
}