import { default as MaterialButton } from '@material-ui/core/Button'

/* eslint-disable-next-line */
export interface ButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <MaterialButton variant="contained" color="primary">
      {children}
    </MaterialButton>
  )
}

export default Button
