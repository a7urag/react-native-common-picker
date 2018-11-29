// @flow
import * as React from 'react';
import {
    Picker,
    Platform,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Modal,
    View
} from 'react-native';

const styles = StyleSheet.create({
    inputTouchable: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 5
    },
    pickerContainer: {
        justifyContent: 'space-between',
        backgroundColor: "white",
        flex: 0
    },
});

type Props = {
    selectedValue: Object,
    values: Array<Object>,
    onValueChange: function,
    style?: StyleSheet.Styles
};
type State = {
    pickerVisible: boolean,
    selectedValue: Object,
}

class CustomPickerIos extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            pickerVisible: false,
            selectedValue: props.selectedValue

        }

    }

    render() {
        const {
            selectedValue, values, onValueChange, style
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={[styles.inputTouchable, style]}
                    onPress={() => {
                        this.setState({
                            pickerVisible: true,
                        })
                    }}
                >
                    <Text style={{color: selectedValue.textColor && selectedValue.textColor}}>
                        {selectedValue.label}
                    </Text>

                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={this.state.pickerVisible}
                    onClose={() => {
                        onValueChange(selectedValue)
                    }}
                >
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={value => this.setState({ selectedValue: value })}
                        >
                            {values.map(item => (
                                <Picker.Item label={item.label} value={item.label} key={JSON.stringify(item)} />
                            ))}
                        </Picker>
                    </View>

                </Modal>
            </View>

        );
    }
}

class CustomPickerAndroid extends React.PureComponent<Props> {
    onPickerValueChange = (selectedValue) => {
        const {onValueChange, values} = this.props;
        const result = values.filter(item => item.label === selectedValue)[0];
        if (onValueChange && typeof onValueChange === 'function') {
            onValueChange(result);
        }
    };

    render() {
        const {selectedValue, values, style} = this.props;
        return (
            <Picker
                selectedValue={selectedValue.label}
                onValueChange={this.onPickerValueChange}
                style={[style, {color: selectedValue.textColor && selectedValue.textColor}]}
            >
                {values.map(item => <Picker.Item label={item.label} value={item.label}/>)}
            </Picker>
        );
    }
}

const CommonPicker = (props: Props) => (
    <SafeAreaView>
        {Platform.OS === 'ios' ? <CustomPickerIos {...props} /> : <CustomPickerAndroid {...props} />}
    </SafeAreaView>
);

export default CommonPicker;
