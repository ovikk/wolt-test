import React from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import styled from "styled-components";

import { fetchShifts } from "../actions";
import { connect } from "react-redux";

import TitleConainer from "./common/TitleContainer";
import ShiftContainer from './common/ShiftContainer';

import moment from 'moment';

class MyShifts extends React.Component {
    render() {
        // this.props.shifts.shifts.map(o => console.log(moment(o.startTime).format('MMMM Do')))
        return (
            <ScrollView style={styles.container}>
                <StatusBar hidden={true} />
                <TitleConainer title="Today" additionalText="2 shifts, 4 h" />
                <ShiftContainer time="12:00 - 14:00" statusText="Booked" statusColor="blue" buttonText="Book" buttonColor="red" /> 
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        shifts: state.shifts
    };
};

const mapDispatchToProps = dispatch => ({
    fetchShifts: () => {
        dispatch(fetchShifts());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyShifts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});