import { Dropzone } from 'dropzone'
import { header } from 'express-validator'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.property_image = {
    acceptedFiles: '.jpg, .png, .jpeg',
    dictDefaultMessage: 'Drop images here to upload',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove image',
    headers: {
        'CSRF-Token': token
    }
}