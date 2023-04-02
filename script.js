
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        var wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#7065F0',
            barHeight: 10,
            interact: false,
            cursorWidth: 0,
            plugins: [
                WaveSurfer.microphone.create()
            ]
        });

        wavesurfer.microphone.on('deviceReady', function(stream) {
            console.log('Device ready!', stream);
        });
        wavesurfer.microphone.on('deviceError', function(code) {
            console.warn('Device error: ' + code);
        });

        wavesurfer.microphone.start();
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.filter(device => device.kind === 'audioinput')
                    .map(device => {
                        const { label, groupId } = device;
                        const select = document.querySelector('#selectmic')

                        const option = document.createElement("option");
                        option.value = groupId;
                        option.textContent = label;
                        select.appendChild(option)
                    })
            })
            .catch(error => {
                console.error(error);
            });
    })
    .catch(error => {
        document.getElementById('funcwrapper').classList.add('hidden')
        document.getElementById('disabledmic').classList.add('show')
        console.error(error);
    });

var recorder, stream;

// função para iniciar a gravação de áudio
function startRecording() {
    var recordedAudio = document.querySelector('#recorded_audio');
    recordedAudio && recordedAudio.removeChild(recordedAudio.firstChild);
    document.querySelector('#startButton').classList.add('hidden')
    document.querySelector('#stopButton').classList.remove('hidden')
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (audioStream) {
            stream = audioStream;
            recorder = new MediaRecorder(stream);
            recorder.start();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// função para parar a gravação de áudio
function stopRecording() {
    document.querySelector('#startButton').classList.remove('hidden')
    document.querySelector('#stopButton').classList.add('hidden')
    recorder.stop();
    stream.getTracks().forEach(function (track) {
        track.stop();
    });

    recorder.ondataavailable = function (e) {
        // chamar a função playAudio() para criar o elemento de áudio e reproduzir o arquivo de áudio gravado
        var audioFile = new Blob([e.data], { type: 'audio/ogg; codecs=opus' });
        playAudio(audioFile);
    }
}

function playAudio(audioBlob) {
    var audioElement = document.createElement('audio');
    audioElement.src = URL.createObjectURL(audioBlob);
    audioElement.controls = true;
    const recordwrapper = document.querySelector('#recorded_audio')
    recordwrapper.appendChild(audioElement);
}

// adicionar eventos de clique aos botões de gravação
document.getElementById('startButton').addEventListener('click', startRecording);
document.getElementById('stopButton').addEventListener('click', stopRecording);