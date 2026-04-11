try:
    import RPi.GPIO as GPIO
    REAL_PI = True
except:
    REAL_PI = False

if REAL_PI:
    GPIO.setmode(GPIO.BCM)
    LED_PIN=17
    GPIO.setup(LED_PIN, GPIO.OUT)

def set_led(state):
    if REAL_PI:
        if state == "true" :
            GPIO.output(LED_PIN, GPIO.HIGH)
            print("LED ON (REAL)")
        else:
            GPIO.output(LED_PIN, GPIO.LOW)
            print("LED OFF (REAL)")
    else:
        if state == "true" :
            print("LED ON (SIMULATED)")
        else:
            print("LED OFF (SIMULATED)")