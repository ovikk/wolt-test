import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { fetchShifts } from "../actions";
import { connect } from "react-redux";

import Routes from './routing';

class Main extends React.Component {
    componentWillMount() {
        this.props.fetchShifts();
    }

    render() {
        console.log(this.props.shifts)
        if (this.props.shifts.init_loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#16A64D"/>
                </View>
            );
        }

        return (
            <Routes />
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
)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
