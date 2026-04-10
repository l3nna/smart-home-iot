import sys
from gpio_control import set_led
from sensor_reader import read_temp

command = sys.argv[1]

if command == "led":
    state = sys.argv[2]
    set_led(state)

elif command == "temp":
    print(read_temp())