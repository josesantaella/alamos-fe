export enum Modal {
    post_view = "post_view"
}

export interface ModalRoute {
    component : React.FC<any>
}

export type ModalRoutesType = {[key in keyof typeof Modal] : ModalRoute }