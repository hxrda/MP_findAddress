import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, Button, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
	//States:
	//(Default region is set to London)
	const [region, setRegion] = useState({
		latitude: 51.5074,
		longitude: -0.1278,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	const [address, setAddress] = useState("");

	//Variables:
	const apiKey = "65c9fa5015413021980748fjk373770";

	//Functions:
	const fetchLocation = () => {
		fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`)
			.then((response) => {
				if (!response.ok)
					throw new Error("Error in fetch: " + response.statusText);
				return response.json();
			})
			.then((data) => {
				//Save response strings into float type variables:
				const lat = parseFloat(data[0].lat);
				const lon = parseFloat(data[0].lon);

				console.log("Parsed Latitude:", lat);
				console.log("Parsed Longitude:", lon);

				setRegion({ ...region, latitude: lat, longitude: lon });
			})
			.catch((err) => console.error(err));
	};

	//Rendering:
	return (
		<View style={styles.container}>
			<View style={{ flex: 11 }}>
				<MapView style={styles.mapStyle} region={region}>
					<Marker
						coordinate={{
							latitude: region.latitude,
							longitude: region.longitude,
						}}
						title="You are here"
						description="..."
					/>
				</MapView>
			</View>

			<View style={{ flex: 1 }}>
				<TextInput
					placeholder="Type address"
					value={address}
					onChangeText={(text) => setAddress(text)}
				/>
				<Button title="Show" onPress={fetchLocation} />
			</View>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapStyle: {
		width: "100%",
		height: "100%",
	},
});
