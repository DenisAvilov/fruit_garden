import React from 'react'
import classNames from 'classnames'
import styles from './animeSound.module.scss'
type AnimeSoundProps = {
	onClick?: () => void
	onMouseMove?: () => void
	onMouseOut?: () => void
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	className?: string
}

const AnimeSound: React.FC<AnimeSoundProps> = ({
	onClick,
	onMouseMove,
	onMouseOut,
	onMouseEnter,
	onMouseLeave,
	className,
}) => {
	const customClass = classNames(className, styles.wrapper_sound)
	const arr = Array.from(Array(16).keys())
	return (
		<div
			className={customClass}
			onClick={onClick}
			onMouseMove={onMouseMove}
			onMouseOut={onMouseOut}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{arr.map((i) => {
				return (
					<div className={styles.line} key={i}>
						<span></span>
					</div>
				)
			})}
		</div>
	)
}
export default AnimeSound
