from flask import Flask

# from AndroidRunner.Device import Device

# noinspection PyUnusedLocal
# def main(device: Device, *args: tuple, **kwargs: dict):
#     pass

app = Flask(__name__,
            static_url_path='',
            static_folder='/home/pi/external_memory/android-runner/python2',
            template_folder='/home/pi/external_memory/android-runner/python2')

if __name__ == "__main__":
    app.run(debug=True, host='192.168.0.243', port=5000) #add local IP-address of the Raspberry Pi

# import serve_webpage
