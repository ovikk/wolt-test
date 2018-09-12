import React from "react";
import { StyleSheet, View, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import styled from "styled-components";

export default class ShiftContainer extends React.Component {
    render() {
        return (
            <Wrapper>
                <View>
                    <TimeText>{this.props.time}</TimeText>
                    {this.props.city && <CityText>{this.props.city}</CityText>}
                </View>

                {this.props.statusText && (
                    <StatusContainer>
                        <StatusText color={this.props.statusColor}>{this.props.statusText}</StatusText>
                    </StatusContainer>
                )}

                <ShiftButton onPress={() => console.log("click")} color={this.props.buttonColor}>
                    {this.props.loading ? <ActivityIndicator color={getColor(this.props.buttonColor)} size="small" /> : <ButtonText color={this.props.buttonColor}>{this.props.buttonText}</ButtonText>}
                </ShiftButton>
            </Wrapper>
        );
    }
}

const Wrapper = styled.View`
    width: 100%;
    border-bottom-width: 0.5;
    border-color: #cbd2e1;
    height: 70;
    background-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 15;
    padding-right: 15;
`;

const TimeText = styled.Text`
    color: #3f6c92;
    font-size: 18;
`;

const CityText = styled.Text`
    color: #a4b8d3;
    font-size: 18;
`;

const StatusContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    flex: 1;
    margin-right: 20;
`;

const getColor = props => {
    switch (props) {
        case "red":
            return "#E2006A";
            break;
        case "green":
            return "#55CB82";
            break;
        case "blue":
            return "#4F6C92";
            break;
        default:
            return "gray";
    }
};

const StatusText = styled.Text`
    font-size: 18;
    font-weight: bold;
    color: ${props => getColor(props.color)};
`;

const ShiftButton = styled.TouchableOpacity`
    border-radius: 20;
    border-width: 1;
    width: 100;
    height: 40;
    justify-content: center;
    align-items: center;

    border-color: ${props => getColor(props.color)};
`;

const ButtonText = styled.Text`
    color: ${props => getColor(props.color)};
    font-size: 18;
`;
