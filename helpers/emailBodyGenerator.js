import fs from 'fs'
import path from 'path'

function htmlToString (pathFile) {
    let htmlString

    try {
        htmlString = fs.readFileSync(
            path.join('C:/Development/NodeJs/bienes_raices/public',pathFile),
            'utf8'
        )
        
    } catch (error) {
        console.log(error)
    }
    return htmlString
}

export const generateEmailContent = (name , token, pathFile, route) => {

    let emailContent = htmlToString(pathFile)
    emailContent = emailContent.replace('{name}', `${name}`)
    emailContent = emailContent.replaceAll('{link}',`${process.env.DOMAIN_URL}:${process.env.PORT ?? 3000}/auth/${route}/${token}`)

    return emailContent
}



