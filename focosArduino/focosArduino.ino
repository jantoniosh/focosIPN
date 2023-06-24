#include <ArduinoJson.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

StaticJsonDocument<200> doc;

int IN1 = A3;
int IN2 = A2;
int IN3 = A1;
int IN4 = A0;

void setup() {
  Serial.begin(9600);
  relay_init();
  while (!Serial) continue;
}

void loop() {
  if (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    Serial.println(data);
    
    DeserializationError error = deserializeJson(doc, data);
    
    // Test if parsing succeeds.
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
    int in1 = doc["IN1"];
    relay_SetStatus(doc["IN1"], doc["IN2"], doc["IN3"], doc["IN4"]);
  }
}

void relay_init(void) {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  relay_SetStatus(1, 1, 1, 1);//turn off all the relay
}

void relay_SetStatus( unsigned char status_1,  unsigned char status_2, unsigned char status_3,unsigned char status_4) {
  digitalWrite(IN1, status_1);
  digitalWrite(IN2, status_2);
  digitalWrite(IN3, status_3);
  digitalWrite(IN4, status_4);
}
