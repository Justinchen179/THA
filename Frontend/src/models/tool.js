export async function performREST(url, data = null, methodType) {
  let body = null
  const headers = null
  const token = getCookie(document.cookie, 'token')

  console.log(token)

  if (methodType !== 'GET') {
    body = { body: data }
  }

  return await fetch(url, {
    method: methodType,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    },
    ...body
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      throw new Error('Network response was not ok.')
    })
    .catch((err) => {
      console.error(err)
    })
}

export const getCookie = (cookie, name) => {
  const value = `; ${cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) return parts.pop().split(';').shift()
}

export const displayPrevious = (Item, ShowNumber = 1, DisplayIndex) => {
  let Pre = 0
  let PreLength = Math.floor(Item.length / ShowNumber)

  if (Item.length % ShowNumber === 0) {
    PreLength--
  }

  Pre = DisplayIndex === 0 ? PreLength : DisplayIndex - 1
  return {
    Previous: Item.slice(Pre * ShowNumber, (Pre + 1) * ShowNumber),
    PagePreIndex: Pre
  }
}

export const displayNext = (Item, ShowNumber = 1, DisplayIndex) => {
  let Next = 0
  let NextLength = Math.floor(Item.length / ShowNumber)

  if (Item.length % ShowNumber === 0) {
    NextLength--
  }

  Next = DisplayIndex === NextLength ? 0 : DisplayIndex + 1
  return {
    Next: Item.slice(Next * ShowNumber, (Next + 1) * ShowNumber),
    PageNextIndex: Next
  }
}
export const scrollToAnchor = (anchorName = 'anchor') => {
  if (anchorName) {
    const anchorElement = document.getElementById(anchorName)

    if (anchorElement) {
      setTimeout(
        () =>
          anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }),
        100
      )
    }
  }
}

export const S3_URI = '<S3_URI>'
export const SERVER_URL = '<SERVER_URL>'
