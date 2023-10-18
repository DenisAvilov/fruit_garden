import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'

const StyledSpan = styled(Link)`
	${({ theme, sx }) => `
	  ${sx};
	  text-decoration: none;
    color: ${theme.palette.primary.dark};		
    &:hover {
     
    }
    &:focus, &:active {
     
    }
    &:disabled {
     
      
    }
  `}
`

type CustomLinkProps = {
	href: string
	children: React.ReactNode
	sx?: object
	style?: string
}

const CustomLink = ({ href, children, sx, style }: CustomLinkProps) => {
	return (
		<Button className={style}>
			<StyledSpan href={href} passHref>
				{children}
			</StyledSpan>
		</Button>
	)
}

export default CustomLink
