import React from "react";
import { StyleSheet, StatusBar, ScrollView, RefreshControl } from "react-native";

import { fetchShifts, cancelShift } from "../actions";
import { connect } from "react-redux";

import TitleContainer from "./common/TitleContainer";
import ShiftContainer from "./common/ShiftContainer";

import moment from "moment";

class MyShifts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderAll() {
        var titleVar = "wolt";

        const shiftarray = this.props.shifts.shifts.filter(o => o.booked);
        return shiftarray.map((o, i) => {
            const acc = [];
            if (o.day !== titleVar) {
                titleVar = o.day;
                var shiftCount = 0;
                var hourCount = 0;
                shiftarray.map(l => {
                    if (l.day === titleVar) {
                        shiftCount++;
                        hourCount += l.duration;
                    }
                });
                acc.push(<TitleContainer title={o.day} additionalText={`${shiftCount} shifts, ${hourCount} h`} key={"title" + i} />);
            }

            let buttonColor = "red";
            let buttonText = "Cancel";

            if (o.ongoin) {
                buttonColor = "gray";
            }

            acc.push(
                <ShiftContainer
                    time={`${o.startHour} - ${o.endHour}`}
                    city={o.area}
                    buttonColor={buttonColor}
                    buttonText={buttonText}
                    key={i}
                    id={o.id}
                    onCancel={() => this.props.cancelShift(o)}
                    loading={o.loading}
                />
            );
            return acc;
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.props.shifts.loading} onRefresh={this.props.fetchShifts} />} >
                <StatusBar hidden={true} />
                {this.renderAll()}
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
    },
    bookShift: shift => {
        dispatch(bookShift(shift));
    },
    cancelShift: shift => {
        dispatch(cancelShift(shift));
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
