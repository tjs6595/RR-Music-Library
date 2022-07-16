
const API_URL = `https://itunes.apple.com/search?term=`

const fetchSearch = async (searchTerm) => {
    const response = await fetch(API_URL + searchTerm)
    const resData = await response.json()
    return resData.results
}

const wrapPromise = async (promise) => {
    let status = 'pending'
    let result = ''
    console.log('helper line 13')
    let suspender = promise.then(response => {
        status = 'success'
        result = response
        console.log('helper line 17')
    }, err => {
        status = 'error'
        result = err
        console.log('helper line 21')
    })
    return {
        read() {
            console.log('helper line 22')
            if(status === 'pending') {
                console.log('helper line 23')
                throw suspender
            } else if (status === 'error') {
                console.log('helper line 26')
                throw result
            }
            return result
        }
    }
}

export const createResource = (searchTerm) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}

