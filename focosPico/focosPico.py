import sys
import ujson
from machine import Pin

IN1 = Pin(28, Pin.OUT)
IN2 = Pin(27, Pin.OUT)
IN3 = Pin(26, Pin.OUT)
IN4 = Pin(22, Pin.OUT)

IN1.on()
IN2.on()
IN3.on()
IN4.on()

while True:
    v = sys.stdin.readline().strip()
    vJson = ujson.loads(v)
    if (vJson['IN1'] == 1):
        IN1.off()
    else:
        IN1.on()
    if (vJson['IN2'] == 1):
        IN2.off()
    else:
        IN2.on()
    if (vJson['IN3'] == 1):
        IN3.off()
    else:
        IN3.on()
    if (vJson['IN4'] == 1):
        IN4.off()
    else:
        IN4.on()
    