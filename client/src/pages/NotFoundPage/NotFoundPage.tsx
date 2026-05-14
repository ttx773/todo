import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
`

const Code = styled.h1`
	font-size: 96px;
	margin: 0;
	color: ${({ theme }) => theme.primary};
`

const Message = styled.p`
	font-size: 20px;
	margin: 8px 0 24px;
	color: ${({ theme }) => theme.textSecondary};
`

const HomeLink = styled(Link)`
	color: ${({ theme }) => theme.primary};
	font-size: 16px;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`

const NotFoundPage: React.FC = () => {
	return (
		<Wrapper>
			<Code>44444444444440444444</Code>
			<Message>Кто здесь ?? Куда вы меня несёте ?</Message>
			<HomeLink to="/">← Вернуться на главную</HomeLink>
		</Wrapper>
	)
}

export default NotFoundPage
