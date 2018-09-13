import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { fetchShifts } from "../actions";
import { connect } from "react-redux";

import Routes from './routing';

class Main extends React.Component {
    componentWillMount() {
    }

    componentDidMount() {
        console.log('MOUNT')
        this.props.fetchShifts();

        this.interval = setInterval(() => this.setState({ time: Date.now() }), 2000);
      }
      componentWillUnmount() {
          console.log('UNMOUNT')
        clearInterval(this.interval);
      }

    render() {
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
