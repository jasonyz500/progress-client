import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, IconButton, Label, Text, TextArea } from 'gestalt';
import _ from 'lodash';
import moment from 'moment';
import { WithContext as ReactTags } from 'react-tag-input';
import { getDisplayTitle } from '../common/utils';
import { fetchUpdatesWeekly, postUpdatesWeekly } from '../../actions';

class EditWeeklyUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekStr: moment(props.match.params.weekStr).startOf('isoWeek').format('YYYY-MM-DD')
    }
  }

  componentWillMount() {
    this.props.fetchUpdatesWeekly(this.state.weekStr, this.state.weekStr);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ updates: nextProps.updates }));
  }

  drawUpdate(update, idx) {
    const tags = _.map(update.tags, tag => ({ text: tag.tag, id: tag.id.toString() }));
    return (
      <Box key={idx}>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`update${idx}`}>
              <Text align="left" bold>Update</Text>
            </Label>
          </Column>
          <Column span={8}>
            <TextArea 
              id={`update${idx}`}
              value={this.props.updates[idx].body}
              onChange={(e) => this.handleChangeUpdate(e.value, idx)}
            />
          </Column>
        </Box>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`tags${idx}`}>
              <Text align="left" bold>Tags</Text>
            </Label>
          </Column>
          <Column span={8}>
            <ReactTags
              tags={tags}
              handleDelete={(e) => this.handleDeleteTag(e, idx)}
              handleAddition={(e) => this.handleAddTag(e, idx)}
              suggestions={this.props.tags}
            />
          </Column>
        </Box>
        <Box display="flex" direction="row" justifyContent="end" right>
          <IconButton
            accessibilityLabel="Delete"
            icon="remove"
            iconColor="red"
            onClick={() => this.removeUpdate(idx)}
          />
        </Box>
        <Divider />
      </Box>
    );
  }

  addUpdate() {
    const { updates } = this.state;
    updates.push({
      body: '',
      tags: []
    });
    this.setState(prevState => ({ updates }));    
  }

  handleChangeUpdate(body, idx) {
    const { updates } = this.state;
    updates[idx].body = body;
    this.setState(prevState => ({ updates }));
  }

  removeUpdate(idx) {
    let { updates } = this.state;
    updates = updates.filter((update, i) => i !== idx)
    this.setState(prevState => ({ updates }));
  }

  handleAddTag(tag, idx) {
    let { updates } = this.state;
    updates[idx].tags.push({ tag: tag.text, id: tag.text });
    this.setState(prevState => ({ updates }));
  }

  handleDeleteTag(tagIdx, updateIdx) {
    const { updates } = this.state;
    updates[updateIdx].tags = updates[updateIdx].tags.filter((tag, i) => i !== tagIdx);
    this.setState(prevState => ({ updates }));
  }

  leavePageFn() {
    this.props.history.length ? this.props.history.goBack() : this.props.history.push('/monthly');
  }

  handleSave() {
    console.log(this.props);
    const { updates, weekStr } = this.state;
    this.props.postUpdatesWeekly(weekStr, updates, this.leavePageFn.bind(this));
  }

  handleCancel() {
    this.leavePageFn();
  }

  render() {
    const { weekStr, updates } = this.state;
    return (
      <Box>
        <Box margin={4} display="flex" direction="row" alignItems="center" alignContent="center">
          <Heading size="xs">{'Edit Weekly Updates: ' + getDisplayTitle(weekStr)}</Heading>
        </Box>
        <Divider />
        {_.map(updates, (update, i) => this.drawUpdate(update, i))}
        <Box margin={3} display="flex" direction="row" alignItems="center" alignContent="center">
          <Text align="left" bold>Add an Update</Text>
          <IconButton
            accessibilityLabel="add an update"
            icon="add-circle"
            iconColor="red"
            size="xl"
            onClick={this.addUpdate.bind(this)}
          />
        </Box>
        <Divider />
        <Box padding={1} display="flex" direction="row" justifyContent="end" right>
          <Box marginRight={1}>
            <Button
              text="Cancel"
              onClick={this.handleCancel.bind(this)}
              inline
            />
          </Box>
          <Button
            text="Save"
            onClick={this.handleSave.bind(this)}
            color="red"
            inline
          />
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ weekly_updates }, ownProps) {
  const { weekStr } = ownProps.match.params;
  const sow = moment(weekStr).startOf('isoWeek').format('YYYY-MM-DD');
  return { updates: weekly_updates[sow] || [] }
}

export default connect(mapStateToProps, { fetchUpdatesWeekly, postUpdatesWeekly })(EditWeeklyUpdates);
