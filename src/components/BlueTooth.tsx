import React, {useState} from 'react';

const BluetoothScanner: React.FC = () => {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice | null>(null);
    const [characteristicValue, setCharacteristicValue] = useState<number>(0);
    const handleScan = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{
                    name: 'fitnestX'
                }],
                optionalServices: ['550e8400-e29b-41d4-a716-446655440000', "550e8400-e29b-41d4-a716-446655440001"]
            });
            setDevices(devices => [...devices, device]);
        } catch (error) {
            console.error('Error scanning for Bluetooth devices:', error);
        }
    };

    const connectToDevice = async (device: BluetoothDevice) => {
        try {
            console.log(device)
            const server = await device.gatt?.connect();
            console.log(111)
            console.log(await server?.getPrimaryServices())
            const service = await server?.getPrimaryService('550e8400-e29b-41d4-a716-446655440000'); // 서비스 UUID로 변경해야 합니다.
            console.log(222)
            const characteristic = await service?.getCharacteristic("550e8400-e29b-41d4-a716-446655440001"); // 특성 UUID로 변경해야 합니다.
            console.log(333)

            characteristic?.addEventListener('characteristicvaluechanged', (event) => {
                const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
                setCharacteristicValue(value ? value.getInt16(0, true) : 0);
                console.log(value)
            });
            await characteristic?.startNotifications();
            setSelectedDevice(device);

        } catch (error) {
            console.error('Error connecting to Bluetooth device:', error);
        }
    };

    return (
        <div>
            <h1>Bluetooth Device Scanner</h1>
            <button onClick={handleScan}>Scan for Devices</button>
            {devices.length > 0 && (
                <div>
                    <h2>Available Devices</h2>
                    <ul>
                        {devices.map(device => (
                            <li key={device.id}>
                                {device.name}{' '}
                                <button onClick={() => connectToDevice(device)}>Connect</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedDevice && (
                <div>
                    <h2>Connected Device</h2>
                    <p>Name: {selectedDevice.name}</p>
                    <p>Characteristic Value: {characteristicValue}</p>
                </div>
            )}
        </div>
    );
};

export default BluetoothScanner;
