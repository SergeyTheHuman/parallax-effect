"use strict"

window.onload = () => {
	const $parallax = document.querySelector('.parallax')

	if ($parallax) {
		const $content = document.querySelector('.content')
		const $clouds = document.querySelector('.images-parallax__clouds')
		const $mountains = document.querySelector('.images-parallax__mountains')
		const $human = document.querySelector('.images-parallax__human')

		//Коеффициенты скорости движения
		const cloudsRatio = 30
		const mountainsRatio = 15
		const humanRatio = 5

		//Скорость анимации
		const animationSpeed = 0.05

		let positionX = 0
		let positionY = 0
		let xCoordProcent = 0
		let yCoordProcent = 0

		function setMouseParallaxEffect() {
			const distX = xCoordProcent - positionX
			const distY = yCoordProcent - positionY

			positionX = positionX + (distX * animationSpeed)
			positionY = positionY + (distY * animationSpeed)

			$clouds.style.cssText = `transform: translate(${positionX / cloudsRatio}%,${positionY / cloudsRatio}%);`
			$mountains.style.cssText = `transform: translate(${positionX / mountainsRatio}%,${positionY / mountainsRatio}%);`
			$human.style.cssText = `transform: translate(${positionX / humanRatio}%,${positionY / humanRatio}%);`

			requestAnimationFrame(setMouseParallaxEffect)
		}

		setMouseParallaxEffect()

		$parallax.addEventListener('mousemove', (event) => {
			const parallaxWidth = $parallax.offsetWidth
			const parallaxHeight = $parallax.offsetHeight

			const coordX = event.pageX - parallaxWidth / 2
			const coordY = event.pageY - parallaxHeight / 2

			xCoordProcent = coordX / parallaxWidth * 100
			yCoordProcent = coordY / parallaxHeight * 100
		})

		let thresholdsSets = []
		for (let index = 0; index <= 1.0; index += 0.005) {
			thresholdsSets.push(index)
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / $parallax.offsetHeight * 100
			setParallaxItemsStyle(scrollTopProcent)
		}
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdsSets
		})

		observer.observe($content)

		function setParallaxItemsStyle(scrollTopProcent) {
			$mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 4}%);`
			$human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 2}%);`
		}
	}
}