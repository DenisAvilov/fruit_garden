import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { Button, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'

const StyledSpans = styled(Link)`
	${({ theme, sx }) => `
	  ${sx};
	  text-decoration: none;
    color: ${theme.palette.text.primary};		
    &:hover {
     
    }
    &:focus, &:active {
     
    }
    &:disabled {
     
      
    }
  `}
`

type LinkMagic = {
	href: string
	children: React.ReactNode
	sx?: object
	style?: string
}

const LinkMagic = ({ href, children, sx, style }: LinkMagic) => {
	return (
		// <Button className={style}>
		<StyledSpans href={href} passHref>
			{children}
		</StyledSpans>
		// </Button>
	)
}

export default LinkMagic
