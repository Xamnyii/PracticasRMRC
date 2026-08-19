import React, { useState, useEffect } from 'react';
// Aquí es donde le decimos a la app que traiga StyleSheet, Text, View, etc.
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';

// 1. Tipado con Interface (TypeScript)
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

//2.hOLA SOY GAY de echo no , solo espnto las pibas k me ablans efefe

// 3. Función principal de la aplicación (aki pondre los nudes de romo)
export default function App() {

  const [search, setSearch] = useState<string>('');
    const [Total, setTotal] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);//esto es deke para k cargue la vaina esa i se usa cuando tenemos k poner un dato asi k cambie  se vea reflejado

  useEffect(() => {//esto es para k funcione la api y c vea asi la buskeda kawai
    const fetchCharacters = async () => {
      setLoading(true);
     // Limpiar la lista de personajes antes de la nueva búsqueda
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);//tremnenda la api XDDD
        const data = await response.json();
        const results = data.results || [];
        setCharacters(results);
        setTotal(results.length);

      } catch (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [search]);

  return (
    <View style={styles.lodelastarjetas}>
      <Text style={styles.title}>Busca tu ricardo y morticio pk no ay apis de skibidi toiled xD</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Niggay romo te amo 3puntos . . . "
        placeholderTextColor="#050505"
      />
<Text style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
        la api tiene {Total} HOMOSEXUALES
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#7e0404" />//esto es para k se vea el circulo de carga kawai
      ) : (
        <FlatList //esto es para solorenderizar lo de la lista y asis
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjetaKawai}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.info}>{item.status} · {item.species}</Text>
              </View>
            </View>
          )}
        />
      )}

    </View>
  );
}
//⠀⠀⠀⠀⣾⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡆⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⡇⠉⠻⣷⣦⡄⠀⠀⠀⠀⠀⠀⠀⣠⣤⡶⠟⠋⢻⡇⠀⠀⠀⠀. . . . p⠀⠀
//⠀⠀⠀⢰⠇⠀⠀⠀⠻⣿⣧⣤⣄⣀⣤⣤⣾⡟⠉⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀       e
//⠀⠀⠀⠘⡄⠀⢀⣠⣴⠟⠋⠉⠀⠀⠈⠙⠻⠿⣷⣀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀         n
//⠀⠀⠀⠀⢐⣦⡾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣾⡁⠀⠀⠀⠀⠀⠀⠀            e
//⠀⠀⠀⢀⢾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⣀⣰⣾⡿⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠸⡇⡀⠀⠀⣀⣿⣻⡗⠀⠰⣛⣍⠀⠀⠘⢿⣿⡟⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⢻⡇⠀⢰⢧⡻⢎⠿⠆⠼⣏⠻⣣⠀⠀⠈⢻⣧⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⢸⢡⠀⢠⣶⠖⠃⠐⠂⠀⠈⠉⢉⠀⢀⡄⣿⡏⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⢀⡠⠒⠛⠻⣮⠈⣿⣦⡀⠰⡷⡇⠀⢀⣽⣂⣿⣇⣿⣇⠀⣀⡤⠤⢀⠀⠀
//⠀⠀⣞⠀⠀⠀⡀⣼⣿⣿⣿⠛⡳⠦⠖⠀⡘⣿⣿⠃⢻⣿⣿⠊⠁⠀⠀⠀⠈⢂
//⠀⢸⡟⢀⠀⢸⡇⣿⢿⣿⠟⠑⠑⢄⠀⠀⡾⠟⡏⠀⢸⠀⠃⠀⣰⡖⠀⠀⢀⢸
//⣰⠀⠃⢸⠆⢼⣷⠙⠀⡀⠀⠀⠀⠘⠓⠎⠆⠀⠈⢲⣤⡄⠀⢰⡿⢃⣴⣶⣼⡏
//⣿⠀⠀⠈⠀⠈⠀⠀⡾⣅⣀⡀⢀⠀⠀⢸⡄⣠⡾⠛⠉⣿⣦⡿⠇⠀⠉⠉⠁⠀
//⣿⣄⠀⠀⢀⡷⠀⠸⡇⠀⠈⠉⠉⠉⠀⠈⠀⠀⠀⠀⠀⣼⠙⠃⠀⠀⠀⠀⠀⠀
//⢿⣿⣿⣦⣼⡅⠀⠀⣷⣦⡀⠀⠀⢀⣠⣶⣶⣤⣀⣤⣾⠇⠀
//
// para ti Romo..
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⢔⣒⠂⣀⣀⣤⣄⣀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⣴⣿⠋⢠⣟⡼⣷⠼⣆⣼⢇⣿⣄⠱⣄
//⠀⠀⠀⠀⠀⠀⠀⠹⣿⡀⣆⠙⠢⠐⠉⠉⣴⣾⣽⢟⡰⠃
//⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣦⠀⠤⢴⣿⠿⢋⣴⡏⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡙⠻⣿⣶⣦⣭⣉⠁⣿⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠈⠉⠉⠉⠉⠇⡟⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⣘⣦⣀⠀⠀⣀⡴⠊⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⢻⣿⣿⣿⣿⠻⣧⡀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠫⣿⠉⠻⣇⠘⠓⠂⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⢶⣾⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣧⠀⢸⣿⠀⠀⠀⠀⠀⠀//es bellisimo⠀⠀
//⠀⠀⠀⠈⠙⠻⢿⣿⣿⠿⠛⣄⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⠂⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀
// 4. Estilos visuales (gemeni me dio una plantilla por eso ay numeros)
const styles = StyleSheet.create({
  lodelastarjetas: {
    flex: 1, 
    backgroundColor: '#121212', 
    paddingTop: 67,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#cb01ef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  tarjetaKawai: {
    flexDirection: 'row',
    backgroundColor: '#3b1d34',
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: 67,
    height: 67,
  },
  details: {
    justifyContent: 'center',
    padding: 12,
  },
  name: {
    color: '#620c5c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    color: '#620c5c',
    marginTop: 4,
  },//la mayoria de los estilos los autocompleto vscode
});