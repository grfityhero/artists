const $mainboard = document.getElementById("mainboard"),
$happy = document.getElementById("happy"),
  $language = document.getElementById("language"),
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8],
  $audioTag = document.getElementById("audio"),
  picturesUrl = [
    {
      id: 1,
      artist: "Andy Warhol",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-14.jpg",
    },
    {
      id: 2,
      artist: "Picasso",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-1.jpg",
    },
    {
      id: 3,
      artist: "Vincent van Gogh",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-3.jpg",
    },
    {
      id: 4,
      artist: "Leonardo da Vinci",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-7.jpg",
    },
    {
      id: 5,
      artist: "Michelangelo",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-13.jpg",
    },
    {
      id: 6,
      artist: "Matisse",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-10.jpg",
    },
    {
      id: 7,
      artist: "Pollock",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-6.jpg",
    },
    {
      id: 8,
      artist: "Munch",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-5.jpg",
    },
    {
      id: 9,
      artist: "Claude Monet",
      url:
        "https://www.bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-8.jpg",
    },
  ]

soundsUrls = {
  wrong: "./sounds/no.mp3",
  correct: "./sounds/yes.mp3",
  youclicked: "./sounds/youclicked.mp3",
}

const playSound = (index) => {
  $audioTag.src = `./sounds/${index}.mp3`
  $audioTag.play()
}

const playSounds = (number) => {
  playSound(0)

  setTimeout(() => {
    playSound(number)
  }, 1500)
}

const selectedAnswer = ($event) => {
  const isLiElement = $event.target.localName === "li"
  if (!isLiElement) {
    return false
  }
  console.log($event.target.dataset.id)
  console.log($mainboard.dataset.answer)

  const currentSelectedAnswer = $event.target.dataset.id
  const correctAnswer = $mainboard.dataset.answer

  const isPlayButton = $event.target.dataset.id === "play-sound"

  if (isPlayButton) {
    return playSounds(correctAnswer)
  }

  if (currentSelectedAnswer === correctAnswer) {
    $mainboard.classList.add("correct")
   /*  $happy.classList.add("show-me")  */

    $audioTag.src = soundsUrls.correct
    $audioTag.play()
    setTimeout(() => {
      $mainboard.classList.remove("correct")
      /* $happy.classList.remove("show-me")  */
      createLevel()
    }, 0)
  } else {
    $mainboard.classList.add("wrong")

    $audioTag.src = soundsUrls.wrong
    $audioTag.play()

    setTimeout(() => {
      playSound(currentSelectedAnswer)
    }, 1100)

    setTimeout(() => {
      $mainboard.classList.remove("wrong")
    }, 1300)
  }
}

const shuffle = (numberArray) => {
  let counter = numberArray.length
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--
    let temp = numberArray[counter]
    numberArray[counter] = numberArray[index]
    numberArray[index] = temp
  }
  return numberArray
}

const createLevel = () => {
  $mainboard.innerHTML = ""
  const random = Math.floor(Math.random() * 11)
  $mainboard.dataset.answer = random

  //playSounds(random+1)

  const randomNumbers = shuffle(numbers) // return array of shuffled numbers
  randomNumbers.forEach((number) => {
    const liElement = document.createElement("li")
    //liElement.innerText = number + 1
    liElement.dataset.id = number + 1

    liElement.style.backgroundImage =
      "url(" + ` ${picturesUrl[number].url}` + ")"
    liElement.style.backgroundPosition = "center"
    liElement.style.backgroundSize = "cover"
    $mainboard.appendChild(liElement)
  })

  const playButton = document.createElement("li")
  playButton.classList.add("play-sound")
  playButton.dataset.id = "play-sound"

  $mainboard.appendChild(playButton)
}

createLevel()

$mainboard.addEventListener("click", selectedAnswer)
