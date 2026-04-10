import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
LED_PIN=17
GPIO.setup(LED_PIN, GPIO.OUT)

def set_led(state):
    if state == "true" :
        GPIO.output(LED_PIN, GPIO.HIGH)
        print("LED ON")

    else:
        GPIO.output(LED_PIN, GPIO.LOW)
        print("LED OFF")