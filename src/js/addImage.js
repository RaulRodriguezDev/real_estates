import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.propertyImage = {
    acceptedFiles: '.jpg, .png, .jpeg',
    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove image',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'image',
    init: function(){
        const dropzone = this
        const publishButton = document.querySelector('#publish')

        publishButton.addEventListener('click', function() {
            console.log('Publishing')
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function(){
            if(dropzone.getActiveFiles().length == 0) 
                window.location.href = '/properties'
        })
    }
}