#include "EmonLib.h"                        // inclui a biblioteca
EnergyMonitor emon1;                        // Cria uma instância

#define   SAMPLING_TIME     0.0001668649    // intervalo de amostragem 166,86us
#define   LINE_FREQUENCY    60              // frequencia 60Hz Brasil

#define   VOLTAGE_AC        220.00          // 220 Volts
#define   ACS_MPY           6.75            // ganho/calibracao da corrente

double Irms = 0;

void setup()
{  
  emon1.current(0, ACS_MPY);             // Corrente: pino analógico, calibracao.
  Serial.begin(9600);
}

void loop()
{
  /* chama função para calculo da corrente */
  Irms = emon1.calcIrms(1996);  // Calculate Irms only
  if(Irms < 0.15)
  {
    Irms = 0;
  }
  /* imprime a corrente no display OLED */
  Serial.print(Irms, 3);
  Serial.println();
}
