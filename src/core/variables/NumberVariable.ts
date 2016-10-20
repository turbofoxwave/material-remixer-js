/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import { Constants as CONST } from "../../lib/Constants";
import { SerializableData } from "../../lib/LocalStorage";
import { Variable, VariableListType, VariableCallback } from "./Variable";

/**
 * Interface for a class that represents a type of Variable for number values.
 * @interface
 * @extends VariableType
 */
interface NumberVariableType extends VariableListType {
  defaultValue: number;
  selectedValue: number;
  possibleValues?: Array<number>;
}

/**
 * A class representing a type of Variable for number values.
 * @class
 * @extends Variable
 * @implements {NumberVariableType}
 */
export class NumberVariable extends Variable implements NumberVariableType {

  /**
   * Creates an instance of a ColorVariable.
   * @constructor
   * @param  {string}           key            A unique key for the Variable.
   * @param  {number}           defaultValue   The default value.
   * @param  {Array<number>}    possibleValues The array of possible values.
   * @param  {VariableCallback} callback       The callback to invoke when updated.
   * @return {[NumberVariable]}
   */
  constructor(key: string, defaultValue: number, possibleValues?: Array<number>, callback?: VariableCallback) {
    super(key, CONST.VARIABLE_TYPE_NUMBER, defaultValue, callback);
    this.possibleValues = possibleValues;
  }

  /**
   * The array of possible values for this Variable.
   * @override
   * @type {Array<number>}
   */
  possibleValues?: Array<number>;

  /**
   * Returns a serialized representation of this object.
   * @override
   * @return {SerializableData} The serialized data.
   */
  serialize(): SerializableData {
    let data = super.serialize();
    data.selectedValue = this.selectedValue;
    data.possibleValues = this.possibleValues;
    return data;
  }

  /**
   * Returns a new initialized NumberVariable from serialized data.
   * @override
   * @param  {SerializableData} data The serialized data.
   * @return {NumberVariable}        A new initialized NumberVariable.
   */
  static deserialize(data: SerializableData): Variable {
    return new NumberVariable(data.key, data.selectedValue, data.possibleValues);
  }
}
