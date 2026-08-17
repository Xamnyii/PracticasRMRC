import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View,TouchableOpacity,Dimensions,Image } from 'react-native';


 export default function App() {
     const [paso, setPaso] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [hasMoved, setHasMoved] = useState(false);
const { width, height } = Dimensions.get('window');
  const moverBotonNo = () => {
    const randomX = Math.random() * (width - 150);
    const randomY = Math.random() * (height - 250);
    setNoButtonPosition({ top: randomY, left: randomX });
    setHasMoved(true);
  };

  return (
    <View style={styles.container}>
        {paso === 1 && (
            <View style={styles.card}>

              <Text style={styles.nigger}>oye Romo</Text>
                     <Text style={styles.nigger2}>t amo romo</Text>
           
            <TouchableOpacity style={styles.btnniga} onPress={() => setPaso(2)}>
              <Text>Continuar..</Text>
            </TouchableOpacity>
             </View>
        )}
        
      {paso === 2 && (
        <View style={styles.card}>
          <Text style={styles.nigger}>kieres ser mipololo¿</Text>
          <Text style={styles.nigger2}>anane</Text>
          
          <TouchableOpacity style={styles.btnniga} onPress={() => setPaso(3)}>
            <Text style={styles.btnniga}>shi(soy kawai)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.btnniga, 
              hasMoved ? { position: 'absolute', top: noButtonPosition.top, left: noButtonPosition.left } : {}
            ]} 
            onPressIn={moverBotonNo}
          >
            <Text style={styles.btnniga}>No(soy un fracasado)</Text>
          </TouchableOpacity>
        </View>
      )}

        {paso === 3 && (
            <View style={styles.card}>
              <Text style={styles.nigger}>t amo jeje</Text>
            <Image source={require('./fotos/image.png')} style={styles.image} />
            </View>
        )}
 
      <StatusBar style="auto" />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#820b0b',
    alignItems: 'center',
    justifyContent: 'center',

  },
  card: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  nigger:{
     color: '#e809ef',
      paddingVertical: 10,
      paddingHorizontal: 20,
  },
  nigger2:{
     color: '#f900bf',
           paddingVertical: 10,
      paddingHorizontal: 20,
},
  btnniga:{

},
  image: {
width: 200,
  height: 200,
  borderRadius: 15,
  marginTop: 15,
  },
});
