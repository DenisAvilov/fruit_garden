import Link from 'next/link'
import { styled } from '@mui/material/styles'
const StyledSpan = styled(Link)`
	${({ theme, sx }) => `
	  ${sx};
		text-decoration: none;
    color: inherit;
		font-family: ${theme.typography.fontFamily};
		
    &:hover {
      
    }
    &:focus, &:active {
     
    }
    &:disabled {
     
      
    }
  `}
`
// color: ${theme.palette.primary.dark};
type CustomLinkProps = {
	href: string
	children: React.ReactNode
	sx?: object
}

const CustomLink = ({ href, children, sx }: CustomLinkProps) => {
	return (
		<StyledSpan sx={sx} href={href} passHref>
			{children}
		</StyledSpan>
	)
}

export default CustomLink
