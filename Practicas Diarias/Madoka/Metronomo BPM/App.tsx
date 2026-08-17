import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import AuroraBackground from './components/AuroraBackground';

const sonidos = {
  1: require('./assets/Sonidos/1.mp3'),
  2: require('./assets/Sonidos/2.mp3'),
  3: require('./assets/Sonidos/3.mp3'),
  4: require('./assets/Sonidos/4.mp3'),
};

export default function App() {
  const [bpm, setBpm] = useState("120");
  const [beat, setBeat] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  async function reproducirGolpe(numero: number) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        sonidos[numero as keyof typeof sonidos]
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir audio:", error);
    }
  }

  useEffect(() => {
    if (!isPlaying) return;

    const bpmNumero = parseInt(bpm, 10);
    if (!bpmNumero || bpmNumero <= 0) return;

    const msPorGolpe = 60000 / bpmNumero;
    const reloj = setInterval(() => {
      setBeat((prev) => {
        const siguiente = prev === 4 ? 1 : prev + 1;
        reproducirGolpe(siguiente);
        return siguiente;
      });
    }, msPorGolpe);

    return () => clearInterval(reloj);
  }, [bpm, isPlaying]);

  return (
    <AuroraBackground>
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.beatText}>{beat}</Text>

          <Text style={styles.labelText}>Calculadora de BPM</Text>

          <TextInput
            value={bpm}
            onChangeText={(text: string) => setBpm(text)}
            keyboardType="numeric"
            style={styles.input}
          />

          <Pressable
            onPress={() => setIsPlaying((prev) => !prev)}
            style={[
              styles.primaryButton,
              { backgroundColor: isPlaying ? '#ff4444' : '#00ff48' },
            ]}
          >
            <Text style={[styles.buttonText, { color: isPlaying ? '#FFFFFF' : '#000000' }]}>
              {isPlaying ? 'DETENER' : 'INICIAR'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              alert(`Va a una velocidad de ${Math.round(60000 / Number(bpm))} ms por golpe`);
            }}
            style={styles.secondaryButton}
          >
            <Text style={styles.buttonText}>MS</Text>
          </Pressable>

          <StatusBar style="auto" />
        </View>
      </View>
    </AuroraBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    backgroundColor: '#0d0a10',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
  },
  beatText: {
    fontFamily: 'monospace',
    fontSize: 100,
    fontWeight: '800',
    color: '#00ff48',
    textAlign: 'center',
  },
  labelText: {
    fontFamily: 'monospace',
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#e0dcdc',
    marginBottom: 8,
  },
  input: {
    color: '#000000',
    backgroundColor: '#ffffff',
    width: 200,
    padding: 8,
    marginVertical: 10,
    borderRadius: 6,
  },
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});